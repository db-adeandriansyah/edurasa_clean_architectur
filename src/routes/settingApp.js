export const koleksiRombel = {
    '1':['1A','1B'],
    '2':['2A','2B'],
    '3':['3A','3B'],
    '4':['4A','4B'],
    '5':['5A','5B','5C'],
    '6':['6A','6B','6C'],
}
export const JenisKurikulum = {
  '1':'kurmer',
  '2':'kurmer',
  '3':'kurtilas',
  '4':'kurmer',
  '5':'kurmer',
  '6':'kurtilas',
}
export const faseKey = {
  "1":"faseA",
  "2":"faseA",
  "3":"faseB",
  "4":"faseB",
  "5":"faseC",
  "6":"faseC",
}
export const jenjangFase={
  'faseA':[1,2],
  'faseB':[3,4],
  'faseC':[5,6]
};
export const faseNameTeks= {
  "1":"Fase A",
  "2":"Fase A",
  "3":"Fase B",
  "4":"Fase B",
  "5":"Fase C",
  "6":"Fase C",
}
export const faseAbjadKarakter = {
  "1":"A",
  "2":"A",
  "3":"B",
  "4":"B",
  "5":"C",
  "6":"C",
}
export const riwayatApiTapel = [ // riwayatApiTapel Lamaso
  {'tapel':'2021','semester':2,'label':'2020/2021','api':'t_2021_s_2','kurmer':[],'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2122','semester':2,'label':'2021/2022','api':'t_2122_s_2','kurmer':[],'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2122','semester':1,'label':'2021/2022','api':'t_2122_s_1','kurmer':[],'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2223','semester':2,'label':'2022/2023','api':'t_2223_s_2','kurmer':[1,4],'kurtilas':[2,3,5,6]},
  {'tapel':'2223','semester':1,'label':'2022/2023','api':'t_2223_s_1','kurmer':[1,4],'kurtilas':[2,3,5,6]},
  {'tapel':'2324','semester':1,'label':'2023/2024','api':'t_2324_s_1','kurmer':[1,2,4,5],'kurtilas':[3,6]},
  {'tapel':'2324','semester':2,'label':'2023/2024',   'api':'t_2324_s_2','kurmer':[1,2,4,5],       'kurtilas':[3,6]},

];
export const riwayatApiTapelReal = [
  {'tapel':'1314','semester':2,'label':'2013/2014',   'api':'t_1314_s_2',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1415','semester':1,'label':'2014/2015',   'api':'t_1415_s_1',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1415','semester':2,'label':'2014/2015',   'api':'t_1415_s_2',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1516','semester':1,'label':'2015/2016',   'api':'t_1516_s_1',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1516','semester':2,'label':'2015/2016',   'api':'t_1516_s_2',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1617','semester':1,'label':'2016/2017',   'api':'t_1617_s_1',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1617','semester':2,'label':'2016/2017',   'api':'t_1617_s_2',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1718','semester':1,'label':'2017/2018',   'api':'t_1718_s_1',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1718','semester':2,'label':'2017/2018',   'api':'t_1718_s_2',      'kurikulum':['k2006'],                      'k2006':[1,2,3,4,5,6],   'kurmer':[],              'kurtilas':[]},
  {'tapel':'1819','semester':1,'label':'2018/2019',   'api':'t_1819_s_1',      'kurikulum':['k2006','kurtilas'],           'k2006':[2,3,5,6],       'kurmer':[],              'kurtilas':[1,4]},
  {'tapel':'1819','semester':2,'label':'2018/2019',   'api':'t_1819_s_2',      'kurikulum':['k2006','kurtilas'],           'k2006':[2,3,5,6],       'kurmer':[],              'kurtilas':[1,4]},
  {'tapel':'1920','semester':1,'label':'2019/2020',   'api':'t_1920_s_1',      'kurikulum':['k2006','kurtilas'],           'k2006':[3,6],           'kurmer':[],              'kurtilas':[1,2,4,5]},
  {'tapel':'1920','semester':2,'label':'2019/2020',   'api':'t_1920_s_2',      'kurikulum':['k2006','kurtilas'],           'k2006':[3,6],           'kurmer':[],              'kurtilas':[1,2,4,5]},
  {'tapel':'2021','semester':1,'label':'2020/2021',   'api':'t_2021_s_1',      'kurikulum':['kurtilas'],                   'k2006':[],              'kurmer':[],              'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2021','semester':2,'label':'2020/2021',   'api':'t_2021_s_2',      'kurikulum':['kurtilas'],                   'k2006':[],              'kurmer':[],              'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2122','semester':1,'label':'2021/2022',   'api':'t_2122_s_1',      'kurikulum':['kurtilas'],                   'k2006':[],              'kurmer':[],              'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2122','semester':2,'label':'2021/2022',   'api':'t_2122_s_2',      'kurikulum':['kurtilas'],                   'k2006':[],              'kurmer':[],              'kurtilas':[1,2,3,4,5,6]},
  {'tapel':'2223','semester':1,'label':'2022/2023',   'api':'t_2223_s_1',      'kurikulum':['kurtilas','kurmer'],          'k2006':[],              'kurmer':[1,4],           'kurtilas':[2,3,5,6]},
  {'tapel':'2223','semester':2,'label':'2022/2023',   'api':'t_2223_s_2',      'kurikulum':['kurtilas','kurmer'],          'k2006':[],              'kurmer':[1,4],           'kurtilas':[2,3,5,6]},
  {'tapel':'2324','semester':1,'label':'2023/2024',   'api':'t_2324_s_1',      'kurikulum':['kurtilas','kurmer'],          'k2006':[],              'kurmer':[1,2,4,5],       'kurtilas':[3,6]},
  {'tapel':'2324','semester':2,'label':'2023/2024',   'api':'t_2324_s_2',      'kurikulum':['kurtilas','kurmer'],          'k2006':[],              'kurmer':[1,2,4,5],       'kurtilas':[3,6]},
];