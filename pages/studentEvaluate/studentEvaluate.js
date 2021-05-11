// pages/studentEvaluate/studentEvaluate.js
import {request} from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuLessInfo:{},
    rate:0,
    message:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  加载传递的默认信息
    this.initInfo();
  },

  initInfo(){
    const stuLessInfo = wx.getStorageSync("stuLessonInfo");
    this.setData({
      stuLessInfo
    })
  },



  //  监听评分
  onChangeRate(e){
    console.log(e);
    const rate = e.detail;
    this.setData({
      rate
    })
  },

  //  监听
  onChangeMessage(e){
    console.log(e);
    const message = e.detail;
    this.setData({
      message
    })
  },

  //  提交评论
  async submitMessage(){
    //  判断内容是否为空
    if(!this.data.rate || !this.data.message){
      wx.showToast({
        title: '评价不能为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return ;
    }

    //  提交内容
    const stuLessonInfo = wx.getStorageSync("stuLessonInfo");
    const params = {};
    params.mentor_id = stuLessonInfo.mentor_id;
    params.course_id = stuLessonInfo.course_id;
    params.stu_id = wx.getStorageSync("stu_id");;
    params.lesson_id =stuLessonInfo.lesson_id;
    params.rate = this.data.rate +"";
    params.content = this.data.message;

    
    const res = await request({url:"student/add/evaluation",data:params,method:"post"});
    wx.showToast({
      title: '评价成功',
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false
    });
    this.onLoad();
  }




})
