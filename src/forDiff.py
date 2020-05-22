import pandas as pd
import numpy as np
import pymysql

dir = 'C:/Users/87046/Documents/GitHub/crawler/'
d = pd.read_excel(dir+'univerpoint.xlsx')

# 打开数据库连接
db = pymysql.connect('127.0.0.1', 'root', 'sql2008', 'gaokao', charset='utf8')

# 删除最低分或省控线为空的数据
d['d'] = d['最低分'].isnull()*1 + d['省控线'].isnull()*1
da = d[d.ix[:, 'd'] < 1].ix[:, :8]
# da = da.loc[da['考生类别'].isin(['理科', '文科'])]

# 获取省份、科目类别等
schools = da['学校名称'].unique().tolist()
cities = da['招生地址'].unique().tolist()
subjects = da['考生类别'].unique().tolist()
batchs = da['录取批次'].unique().tolist()

# 计算线差
da['线差'] = da['最低分'] - da['省控线']

for school in schools:
    for city in cities:
        for sub in subjects:
            for batch in batchs:
                choose = da.loc[(da['学校名称'] == school) & (da['招生地址'] == city) & (da['考生类别'] == sub) & (da['录取批次'] == batch) & (da['线差'] != 0) & (da['线差'] > 0) & (da['招生地址'] != '浙江')]
                dat = np.array(choose['线差'])
                data = dat[::-1]
                lens = len(data)  # 数据量

                if(lens == 3):

                    # 数据检验
                    # 计算级比
                    lambds = []
                    for i in range(1, lens):
                        if((data[i-1] != 0) & (data[i] != 0)):
                            lambds.append(data[i-1]/data[i])
                        else:
                            continue
                    # 计算区间
                    X_min = np.e**(-2/(lens+1))
                    X_max = np.e**(2/(lens+1))
                    # 检验
                    is_ok = True
                    for lambd in lambds:
                        if (lambd < X_min or lambd > X_max):
                            is_ok = False
                    if (is_ok is False):
                        print('该数据未通过检验')
                        continue
                    else:
                        print('该数据通过检验')

                    data_1 = []
                    data_1.append(data[0])
                    for i in range(1, lens):
                        data_1.append(data_1[i-1]+data[i])
                    # 灰导数及临值生成数列
                    ds = []
                    zs = []
                    for i in range(1, lens):
                        ds.append(data[i])
                        zs.append(-1/2*(data_1[i-1]+data_1[i]))
                        # zs.append(-(0.4*data_1[i-1]+0.6*data_1[i]))
                    # 求a、b
                    B = np.array(zs).reshape(lens-1, 1)
                    one = np.ones(lens-1)
                    B = np.c_[B, one]  # 加上一列1
                    Y = np.array(ds).reshape(lens-1, 1)
                    a, b = np.dot(np.dot(np.linalg.inv(np.dot(B.T, B)), B.T), Y)
                    print('a='+str(a))  # 发展系数
                    print('b='+str(b))  # 灰色作用量

                    # 预测
                    def func(k):
                        c = b/a
                        return (data[0]-c)*(np.e**(-a*k))+c

                    data_1_hat = []  # 累加预测值
                    data_0_hat = []  # 原始预测值
                    data_1_hat.append(func(0))
                    data_0_hat.append(data_1_hat[0])
                    for i in range(1, lens+1):  # 多预测1次
                        data_1_hat.append(func(i))
                        data_0_hat.append(data_1_hat[i]-data_1_hat[i-1])
                    print('预测值为：')
                    for i in data_0_hat:
                        print(i)

                    # 使用cursor()方法获取操作游标
                    cursor = db.cursor()
                    # sql插入语句
                    sql = "INSERT INTO forDiff(school,curplace,subject,year,diff,batch) VALUES \
                        (%s,%s,%s,%s,%s,%s);"
                    diff = ''.join('%s' % id for id in data_0_hat[-1])
                    try:
                        # 执行sql语句
                        cursor.execute(sql, [school, city, sub, '2020', diff, batch])
                        # 提交到数据库执行
                        db.commit()
                        print('插入数据库')
                    except Exception:
                        # 发生错误时回滚
                        db.rollback()
# 关闭数据库连接
db.close()
