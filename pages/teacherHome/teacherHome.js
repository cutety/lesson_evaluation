// pages/teacherHome/teacherHome.js
import {request} from "../../request/index.js";
import regeneratorRuntime, { async } from '../../lib/runtime/runtime';
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeShow:false,
    gradeColumns: [],
    gradeValue:"",
    classShow:false,
    classColumns: [],
    classValue:{},
    lessonValue:{},
    lessonValueOne:"",
    lessonShow:false,
    lessonColumns: ['17', '18', '19', '20'],
    //  开始时间选择器显示
    startDateShow:false, 
    endDateShow:false,
    currentDate: new Date().getTime(),
    startDateValue:"选择上课时间",
    endDateValue:"选择下课时间",

    


    tableHeader: [
      {
        prop: 'lesson',
        width: 200,
        label: '课程名'
      },
      {
        prop: 'stu_name',
        width: 152,
        label: '评价人'
      },
      {
        prop: 'content',
        width: 300,
        label: '内容',
        color: '#55C355'
      },
      {
        prop: 'start_at',
        width: 150,
        label: '时间'
      }
    ],
    stripe: true,
    border: true,
    outBorder: true,
    lessonMessage: [],
      
    msg: '暂无数据'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //  获取年级
    this.getGradeData();

  },
  // 获取年级信息
  async getGradeData(){
    const res = await request({url:"students/grade/list"});
    console.log(res);
    
    const gradeColumns = res.data.data;
    this.setData({
      gradeColumns
    })
  },

  //  显示年级选择器
  showGrade(){
    this.setData({
      gradeShow:true
    })
  },
  //  根据年级信息 获取班级的信息
  async getClassData(){
    const res = await request({url:"class/list?grade="+this.data.gradeValue});
    const classColumns = res.data.data;
    this.setData({
      classColumns
    })
  },

  //  根据年级信息 班级信息  获取课程信息
  async getLessonData(){
    const res = await request({url:"course/list?mentor_id="+wx.getStorageSync("mentor_id")+"&grade="+this.data.gradeValue+"&class="+this.data.classValue.name});
    const lessonColumns = res.data.data;
    this.setData({
      lessonColumns
    })
  },


  //  年级选择器确认
  onConfirmGrade(e){
    console.log(e);
    this.setData({
      gradeValue:e.detail.value,
    })
    this.onClose(); 
    this.getClassData();
  },

  

  //  显示班级选择器
  showClass(){
    this.setData({
      classShow:true
    })
  },

  //  班级选择器确认
  onConfirmClass(e){
    console.log(e);
    this.setData({
      classValue:e.detail.value,
    })
    this.onClose();
    this.getLessonData();
  },

  //  显示课程名选择器
  showLesson(){
    this.setData({
      lessonShow:true
    })
  },

  //  课程名选择器确认
  onConfirmLesson(e){
    console.log(e);
    this.setData({
      lessonValue:e.detail.value,
    })
    this.onClose();
    
  },

  //  关闭所有选择器  弹出框
  onClose(){
    this.setData({
      gradeShow:false,
      classShow:false,
      lessonShow:false,
      startDateShow:false,
      endDateShow:false
    })
  },

  lessonChange(e){
    console.log(e);
    this.setData({
      lessonValueOne:e.detail
    })
    
  },
  //  显示上课时间选择器
  showStartDate(){
    this.setData({
      startDateShow:true
    })
  },
  //  设置上课时间
  setStartDate(e){
    const times = e.detail;//  获取选择的时间戳
    var str = util.formatTime(new Date(times));
    console.log(str);
    //  设置上课时间value
    this.setData({
      startDateValue:str
    })
    this.onClose();


  },

  //  显示下课时间选择器
  showEndDate(){
    this.setData({
      endDateShow:true
    })
  },
  //  设置下课时间
  setEndDate(e){
    const times = e.detail;//  获取选择的时间戳
    var str = util.formatTime(new Date(times));
    console.log(str);
    //  设置下课时间value
    this.setData({
      endDateValue:str
    })
    this.onClose();
    
  },

  //  添加课程
  async addLesson(){
    //  判断内容是否为空
    
    //  请求  添加内容
    const params = {};
    params.mentor_id = wx.getStorageSync("mentor_id");
    params.grade = this.data.gradeValue;
    params.class = this.data.classValue.name;
    params.lesson = this.data.lessonValueOne;
    const res = await request({url:"mentor/add/course",data:params,method:"post"});
    console.log(res);
    wx.showToast({
      title: res.data.msg,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
    
  },

  //  开始上课
  async startLesson(){
    let params = {};
    params.course_id = this.data.lessonValue.course_id;
    params.class_id = this.data.classValue.class_id;
    params.start_at = this.data.startDateValue;
    params.end_at = this.data.endDateValue;
    const res = await request({url:"mentor/add/lesson",data:params,method:"post"});

    wx.showToast({
      title: res.data.msg,
      icon: 'none',
      image: '',
      duration: 1500,
      mask: false,
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    


  },

  //  tab切换
  onChangeTab(e){
    console.log(e);
    //  如果是课堂评价就获取数据
    if(e.detail.index == 2){
      this.getLessonMessage();
    }
  },



  //  获取课堂评价数据
  async getLessonMessage(){
    const res = await request({url:"user/evaluation/list/detail?mentor_id="+wx.getStorageSync("mentor_id")})
    console.log(res);
    const lessonMessage = res.data.data.items;
    this.setData({
      lessonMessage
    })
    
  
  }




  
})