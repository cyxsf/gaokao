# 代码说明：
# 基于内容的推荐算法的具体实现

import math
import numpy as np
import pandas as pd
import pymysql
import sys

# 建立学校类型矩阵


def creatSchoolMatrix(sql):
    # 打开数据库连接
    db = pymysql.connect('127.0.0.1', 'root', 'sql2008', 'gaokao', charset='utf8')

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # sql插入语句

    all_label = ['///', '985', '211', '综合', '工科', '农业', '师范', '民族', '林业', '医药', '语言', '财经', '体育', '艺术', '政法', '军事', '本科',
                 '其它', '高职专科', '独立院校', '教育部', '教育厅']

    matrix = []
    items = []

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()

        for item in results:
            new_row = []
            for label in all_label:
                if((item[4] == label) | (item[5] == label) | (item[6].find(label) >= 0) | (item[7].find(label) >= 0)):
                    new_row.append(1)
                else:
                    new_row.append(0)
            matrix.append(new_row)
        for i in results:
            items.append(i[1])
        for row in matrix:
            row[0] = items.pop(0)
        return matrix

    except Exception:
        print("Error")
    # 关闭数据库连接
    cursor.close()
    db.close()

def creatSchoolMatrix2(sql):
    # 打开数据库连接
    db = pymysql.connect('127.0.0.1', 'root', 'sql2008', 'gaokao', charset='utf8')

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # sql插入语句

    all_label = ['///', '985', '211', '综合', '工科', '农业', '师范', '民族', '林业', '医药', '语言', '财经', '体育', '艺术', '政法', '军事', '本科',
                 '其它', '高职专科', '独立院校', '教育部', '教育厅']

    matrix = []
    items = []

    try:
        # 执行sql语句
        cursor.execute(sql,[sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5]])
        # 获取所有记录列表
        results = cursor.fetchall()

        for item in results:
            new_row = []
            for label in all_label:
                if((item[4] == label) | (item[5] == label) | (item[6].find(label) >= 0) | (item[7].find(label) >= 0)):
                    new_row.append(1)
                else:
                    new_row.append(0)
            matrix.append(new_row)
        for i in results:
            items.append(i[1])
        for row in matrix:
            row[0] = items.pop(0)
        return matrix

    except Exception:
        print("Error")
    # 关闭数据库连接
    cursor.close()
    db.close()

# 建立评分矩阵


def creatRateMatrix():
    # 打开数据库连接
    db = pymysql.connect('127.0.0.1', 'root', 'sql2008', 'gaokao', charset='utf8')

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # sql插入语句
    sql = "select * from recoList where case when cate = 3 and collect = 0 then 0 else 1 end=1 order by userid"

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        data = cursor.fetchall()
        columnDes = cursor.description  # 获取连接对象的描述信息
        columnNames = [columnDes[i][0] for i in range(len(columnDes))]
        sdf = pd.DataFrame([list(i) for i in data], columns=columnNames)

        df_ = pd.DataFrame()  # 新定义一个数据框df
        for i in range(len(sdf)):
            row_i = sdf.loc[[i]]
            user_id = (row_i['userid'].tolist())[0]
            items_name = (row_i['school'].tolist())[0]
            rating = (row_i['rate'].tolist())[0]
            df_.at[user_id, items_name] = rating

        df = df_.fillna(0)  # 将所有的NaN值用0填充
        return df

    except Exception:
        print("Error")
    # 关闭数据库连接
    cursor.close()
    db.close()


def selectUserName():
    # 打开数据库连接
    db = pymysql.connect('127.0.0.1', 'root', 'sql2008', 'gaokao', charset='utf8')

    # 使用cursor()方法获取操作游标
    cursor = db.cursor()

    # sql插入语句
    sql = "SELECT distinct userid FROM recoList order by userid"

    all_users_names = []

    try:
        # 执行sql语句
        cursor.execute(sql)
        # 获取所有记录列表
        results = cursor.fetchall()
        for i in results:
            all_users_names.append(i[0])
        return all_users_names
    except Exception:
        print("Error")
    # 关闭数据库连接
    cursor.close()
    db.close()

# 创建节目画像
# 参数说明：
# items_profiles = {item1:{'label1':1, 'label2': 0, 'label3': 0, ...}, item2:{...}...}


def createItemsProfiles(data_array, labels_names, items_names):

    items_profiles = {}

    for i in range(len(items_names)):

        items_profiles[items_names[i]] = {}

        for j in range(len(labels_names)):
            items_profiles[items_names[i]][labels_names[j]] = data_array[i][j]

    return items_profiles

# 创建用户画像
# 参数说明：
# data_array: 所有用户对于其所看过的节目的评分矩阵 data_array = [[2, 0, 0, 1.1, ...], [0, 0, 1.1, ...], ...]
# users_profiles = {user1:{'label1':1.1, 'label2': 0.5, 'label3': 0.0, ...}, user2:{...}...}


def createUsersProfiles(data_array, users_names, items_names, labels_names, items_profiles):

    users_profiles = {}

    # 计算每个用户对所看过的所有节目的平均隐性评分
    # users_average_scores_list = [1.2, 2.2, 4.3,...]
    users_average_scores_list = []

    # 统计每个用户所看过的节目（不加入隐性评分信息）
    # items_users_saw = {user1:[item1, item3, item5], user2:[...],...}
    items_users_saw = {}

    # 统计每个用户所看过的节目及评分
    # items_users_saw_scores = {user1:[[item1, 1.1], [item2, 4.1]], user2:...}
    items_users_saw_scores = {}

    for i in range(len(users_names)):

        items_users_saw_scores[users_names[i]] = []
        items_users_saw[users_names[i]] = []
        count = 0
        sum = 0.0

        for j in range(len(items_names)):

            # 用户对该节目隐性评分为正，表示真正看过该节目
            if data_array[i][j] > 0:
                items_users_saw[users_names[i]].append(items_names[j])
                items_users_saw_scores[users_names[i]].append([items_names[j], data_array[i][j]])
                count += 1
                sum += data_array[i][j]

        if count == 0:
            users_average_scores_list.append(0)
        else:
            users_average_scores_list.append(sum / count)

    for i in range(len(users_names)):

        users_profiles[users_names[i]] = {}

        for j in range(len(labels_names)):
            count = 0
            score = 0.0

            for item in items_users_saw_scores[users_names[i]]:

                # 参数：
                # 用户user1对于类型label1的隐性评分: user1_score_to_label1
                # 用户user1对于其看过的含有类型label1的节目item i 的评分: score_to_item i
                # 用户user1对其所看过的所有节目的平均评分: user1_average_score
                # 用户user1看过的节目总数: items_count

                # 公式： user1_score_to_label1 = Sigma(score_to_item i - user1_average_score)/items_count

                # 该节目含有特定标签labels_names[j]
                if int(items_profiles[item[0]][labels_names[j]]) > 0:
                    score += (item[1] - users_average_scores_list[i])
                    count += 1

            # 如果求出的值太小，直接置0
            if abs(score) < 1e-6:
                score = 0.0
            if count == 0:
                result = 0.0
            else:
                result = score / count

            users_profiles[users_names[i]][labels_names[j]] = result

    return (users_profiles, items_users_saw)


# 计算用户画像向量与节目画像向量的距离（相似度）
# 向量相似度计算公式：
# cos(user, item) = sigma_ui/sqrt(sigma_u * sigma_i)

# 参数说明：
# user_profile: 某一用户user的画像 user = {'label1':1.1, 'label2': 0.5, 'label3': 0.0, ...}
# item: 某一节目item的画像 item = {'label1':1, 'label2': 0, 'label3': 0, ...}
# labels_names: 所有类型名
def calCosDistance(user, item, labels_names):

    sigma_ui = 0.0
    sigma_u = 0.0
    sigma_i = 0.0

    for label in labels_names:
        sigma_ui += float(user[label]) * float(item[label])
        sigma_u += (user[label] * user[label])
        sigma_i += float(item[label]) * float(item[label])

    if sigma_u == 0.0 or sigma_i == 0.0:  # 若分母为0，相似度为0
        return 0

    return sigma_ui/math.sqrt(sigma_u * sigma_i)


# 基于内容的推荐算法：
# 借助特定某个用户user的画像user_profile和备选推荐节目集的画像items_profiles，通过计算向量之间的相似度得出推荐节目集

# 参数说明：
# user_profile: 某一用户user的画像 user_profile = {'label1':1.1, 'label2': 0.5, 'label3': 0.0, ...}
# items_profiles: 备选推荐节目集的节目画像: items_profiles = {item1:{'label1':1, 'label2': 0, 'label3': 0}, item2:{...}...}
# items_names: 备选推荐节目集中的所有节目名
# labels_names: 所有类型名
# items_user_saw: 用户user看过的节目

def contentBased(user_profile, items_profiles, items_names, labels_names, items_user_saw):

    # 对于用户user的推荐节目集为 recommend_items = [[节目名, 该节目画像与该用户画像的相似度], ...]
    recommend_items = []

    for i in range(len(items_names)):
        # 从备选推荐节目集中的选择用户user没有看过的节目
        if items_names[i] not in items_user_saw:
            recommend_items.append([items_names[i], calCosDistance(user_profile, items_profiles[items_names[i]], labels_names)])

    # 将推荐节目集按相似度降序排列
    recommend_items.sort(key=lambda item: item[1], reverse=True)

    return recommend_items

# 输出推荐给该用户的节目列表
# max_num:最多输出的推荐节目数


def printRecommendedItems(recommend_items_sorted, max_num):
    count = 0
    str = ''
    for item, degree in recommend_items_sorted:
        str += item + ','
        count += 1
        if count == max_num:
            break
    print(str, end='')


# 主程序
if __name__ == '__main__':

    all_users_names = selectUserName()
    all_labels = ['985', '211', '综合', '工科', '农业', '师范', '民族', '林业', '医药', '语言', '财经', '体育', '艺术', '政法', '军事', '本科',
                  '其它', '高职专科', '独立院校', '教育部', '教育厅']
    labels_num = len(all_labels)

    df1 = creatRateMatrix()
    (m1, n1) = df1.shape
    # 所有用户对学校的评分矩阵
    # data_array1 = [[0.1804 0.042 0.11  0.07  0.19  0.56  0.14  0.3  0.32 0, ...], [...]]
    data_array1 = np.array(df1.iloc[:m1 + 1, 0:])
    # 按照"所有用户对学校的评分矩阵"的列序排列的所有的学校名称
    items_users_saw_names1 = df1.columns[0:].tolist()

    sql2 = "SELECT * FROM univerinfo a join recoList b on a.school = b.school where case when cate = 3 and collect = 0 then 0 else 1 end=1"
    matrix2 = np.array(creatSchoolMatrix(sql2))
    (m2, n2) = matrix2.shape
    data_array2 = matrix2[:m2+1:, 1:]
    # 按照"所有系统筛选的学校及所属类型的01矩阵"的列序排列的所有学校名称
    items_users_saw_names2 = matrix2[:m2 + 1, 0].tolist()

    # 为系统筛选的学校建立学校画像
    items_users_saw_profiles = createItemsProfiles(data_array2, all_labels, items_users_saw_names2)

    # 建立用户画像users_profiles和系统筛选学校集items_users_saw
    (users_profiles, items_users_saw) = createUsersProfiles(data_array1, all_users_names, items_users_saw_names1, all_labels, items_users_saw_profiles)

    sql3 = "SELECT * ,(diff+line) as score FROM univerinfo a join forDiff b join forLine c on a.school = b.school and b.curplace = c.curplace and b.subject = c.subject and b.batch = c.batch where b.curplace = (%s) and b.subject = (%s) and (diff+line) >= (%s) and (diff+line) < (%s) and a.school not in (select school from recoList where userid = (%s)) order by (diff+line);"
    matrix3 = np.array(creatSchoolMatrix2(sql3))
    (m3, n3) = matrix3.shape
    data_array3 = matrix3[:m3+1:, 1:]
    # 按照"备选推荐节目集及所属类型01矩阵"的列序排列的所有用户观看过的节目名称
    items_to_be_recommended_names = matrix3[:m3 + 1, 0].tolist()

    # 为备选推荐节目集建立节目画像
    items_to_be_recommended_profiles = createItemsProfiles(data_array3, all_labels, items_to_be_recommended_names)

    for user in all_users_names:
        # print("对于用户 %s 推荐的学校如下：" % user)
        recommend_items = contentBased(users_profiles[user], items_to_be_recommended_profiles, items_to_be_recommended_names, all_labels, items_users_saw[user])
        printRecommendedItems(recommend_items, 3)
        print()
