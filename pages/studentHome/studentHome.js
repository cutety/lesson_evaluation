import {request} from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tableHeader: [
      {
        prop: 'lesson',
        width: 200,
        label: '课程名',
        color: '#55C355'
      },
      {
        prop: 'mentor_name',
        width: 152,
        label: '任课教师'
      },
      {
        prop: 'start_at',
        width:350,
        label: '上课时间'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,
    rowData: [
    ],
    msg: '暂无数据',

    EvaListData:[]
  },
  onLoad: function (options) {
    //  初始化加载数据
    this.getlessonData();
    this.getEvaList();
  },

  //  获取未评价的课程
  async getlessonData(){
      const res = await request({url:"student/evaluable/lesson?stu_id="+wx.getStorageSync("stu_id")});
      console.log(res);

      const rowData = res.data.data;
      this.setData({
        rowData
      })
      

  },

  //  获取未评价的课程
  async getEvaList(){
    const res = await request({url:"user/evaluation/list/history?stu_id="+wx.getStorageSync("stu_id")});
    console.log(res);

    const EvaListData = res.data.data.items;
    this.setData({
      EvaListData
    })  
  },
  

  /** 
   * 点击表格一行
   */
  onCellClick: function(e) {
    console.log( e)
    const stuLessonInfo  = e.detail.target.dataset.it;
    console.log(stuLessonInfo);
    
    //  保存当前点击的课程信息
    wx.setStorageSync("stuLessonInfo", stuLessonInfo);
    //  跳转到学生评论地址
    wx.navigateTo({
      url: '../../pages/studentEvaluate/studentEvaluate',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });


  }
})