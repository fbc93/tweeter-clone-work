export const profileArr = [
  "avatar_01",
  "avatar_02",
  "avatar_03",
  "avatar_04",
  "avatar_05",
  "avatar_06",
  "avatar_07",
  "avatar_08",
];

export const changeDateForm = (data:Date) => {

  const dateData = new Date(data);
  const year = dateData.getFullYear();
  const month = String(dateData.getMonth()).padStart(2,"0");
  const date = String(dateData.getDate()).padStart(2,"0");

  return `${year}-${month}-${date}`;
}

export const calcDateFromNow = (data:Date) => {

  const startDate = +new Date(data);
  const endDate = +new Date();

  const diff = (endDate - startDate) / 1000;

  const times = [
    {name:"년", milliSeconds:60*60*24*365},
    {name:"개월", milliSeconds:60*60*24*30},
    {name:"일", milliSeconds:60*60*24},
    {name:"시간", milliSeconds:60*60},
    {name:"분", milliSeconds:60},
  ];

  for (const value of times){
    const diffTime = Math.floor(diff/value.milliSeconds);

    if(diffTime > 0){
      return `${diffTime}${value.name} 전`;
    }
  }
  return "방금 전";
}
