import {request} from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  async login(){
    if(!this.data.username || !this.data.password){
      wx.showToast({
        title: '信息不能为空',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
      return;
    }
    //  登录
    let queryData = {};
    queryData.user_id = this.data.username;
    queryData.password = this.data.password;
    const res = await request({url:"user/login",data:queryData,method:"post"});
    console.log(res);
    //  查看是否成功
    if(res.data.data){
      //  保存token信息 

      
      if(res.data.data.role == 2){
        // 学生
        wx.setStorageSync("stu_id", this.data.username);  //  保存学生信息到本地
        console.log(res.data.data.token)
        wx.setStorageSync("token",res.data.data.token);   //  保存token到本地
        wx.navigateTo({
          url: '../../pages/studentHome/studentHome'
        });



      }else if(res.data.data.role == 3){
        //  教师
        wx.setStorageSync("mentor_id", this.data.username);  //  保存学生信息到本地
        wx.setStorageSync("token",res.data.data.token);   //  保存token到本地
        wx.navigateTo({
          url: '../../pages/teacherHome/teacherHome'
        });

      }
      
      

    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false
      });
    }

    
  },
  onChangeUsername(e) {
    console.log(e);
    
    this.setData({
      username:e.detail
    });

  },
  onChangePassword(e) {
    console.log(e);
    
    this.setData({
      password:e.detail
    });

  }
})