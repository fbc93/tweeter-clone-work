interface AttachFileProps {
  register?: any;
  type?: string;
  onClickHandler?: any;
  imageIcon?: boolean;
  youtubeIcon?: boolean;
  id: string;
  name: string;
  accept?: string;
  placeholder?: string;
  labelName?: string;
}

const AttachFileInput = ({ id, name, accept, labelName, placeholder, register, onClickHandler, type, imageIcon, youtubeIcon }: AttachFileProps) => {
  return (
    <div className="flex justify-between">
      <label htmlFor={labelName} className="cursor-pointer flex justify-center items-center text-sm">
        {/* 이미지 버튼 */}
        {imageIcon && (
          <div className="p-2 mr-2 bg-gray-500/60 rounded-md">
            <svg className="w-5 h-5 text-white drop-shadow-sm" fill="" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
            </svg>
          </div>
        )}
        {youtubeIcon && (
          <div className="p-2 mr-2 bg-gray-500/60 rounded-md">
            <svg className="w-5 h-5 drop-shadow-sm" fill="red" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 310 310">
              <g id="XMLID_822_">
                <path id="XMLID_823_" d="M297.917,64.645c-11.19-13.302-31.85-18.728-71.306-18.728H83.386c-40.359,0-61.369,5.776-72.517,19.938
           C0,79.663,0,100.008,0,128.166v53.669c0,54.551,12.896,82.248,83.386,82.248h143.226c34.216,0,53.176-4.788,65.442-16.527
           C304.633,235.518,310,215.863,310,181.835v-53.669C310,98.471,309.159,78.006,297.917,64.645z M199.021,162.41l-65.038,33.991
           c-1.454,0.76-3.044,1.137-4.632,1.137c-1.798,0-3.592-0.484-5.181-1.446c-2.992-1.813-4.819-5.056-4.819-8.554v-67.764
           c0-3.492,1.822-6.732,4.808-8.546c2.987-1.814,6.702-1.938,9.801-0.328l65.038,33.772c3.309,1.718,5.387,5.134,5.392,8.861
           C204.394,157.263,202.325,160.684,199.021,162.41z"/>
              </g>
            </svg>
          </div>
        )}
        {/* 이미지 첨부파일 업로드 Form */}
        <div className="block overflow-hidden w-[220px]"
        >
          <input
            {...register}
            id={id}
            name={name}
            type={type}
            accept={accept}
            placeholder={placeholder}
            className="w-full text-white placeholder:text-white px-2 bg-transparent border-none block indent-2 focus:outline-none text-xs drop-shadow-sm"
          />
        </div>
      </label>
      {/* 파일삭제 버튼 */}
      <div onClick={onClickHandler} className="p-2 bg-red-700 rounded-md cursor-pointer">
        <svg className="w-5 h-5 drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
        </svg>
      </div>
    </div>
  );
}

export default AttachFileInput;