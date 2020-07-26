import getEmbedly from './Embedly';

it('Get Embedly Info From Embedly', () => {
  getEmbedly("https://github.com/5-SH/standup").then((response)=>{
    expect(response.data.url).toEqual("https://github.com/5-SH/standup");
  }).catch((error)=>{
    console.log(error);
  });
});