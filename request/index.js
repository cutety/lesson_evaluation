let requestNum = 0;
export const request = (params) =>{
  const baseUrl = "http://121.5.106.250:3000/api/v1/";
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      header:{"Authorization":"Bearer "+wx.getStorageSync("token")},
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
      }

    })
  })
}