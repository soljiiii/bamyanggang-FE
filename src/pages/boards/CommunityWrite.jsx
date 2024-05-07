import axios from "axios";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import Button from "../../component/common/Button";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import "./Community.css";
import LoginCheck from "../../utils/LoginCheck";

function CommunityWrite(){
    const navigate = useNavigate();

    const [postNo, setPostNo] =useState();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [img, setImage] = useState('');

    //userIdToken에서 parsing한 id
    const userIdToken = JSON.parse(localStorage.getItem('user')).userId;
    
    //db insert함수
    const insert=()=>{

        //title, content 길이 유효성 검사
        if (title.length > 100){
            alert('제목은 100자 이내로 입력해주세요');
            return;
        }

        if(content.length > 1000){
            alert('내용은 1000자 이내로 입력해주세요');
            return;
        }

        //게시글 추가
        alert('게시글 추가');
        axios.post(`http://localhost:80/community/communitywrite`,{
            'userId' : userIdToken,
            'title' : title,
            'content' : content,
            'img' : img

        }).then(function (response){
            navigate(`/community`);

        }).catch(function(error){
            console.log("error", error);

        });

    }

    return(
        <div>
            <Header />
            <SubBanner />
            <div className="communityList">
                <h1>커뮤니티</h1>
                <br/>
                <br/>
                <div className="communityWrite">
                    <div className="inputTitleArea">
                        <input className="inputTitle"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(event) => {
                                setTitle(event.target.value);
                        }}
                        />
                    </div>
                    
                    <div className="inputContentArea">
                        <textarea className="inputContent" 
                            value={content}
                            onChange={(event)=>{
                                setContent(event.target.value);
                            }}
                        />
                    </div>
                    
                        
                    <div>
                        <button>
                            <input hidden
                            type="file"
                            accept="image/jpg,image/png,image/jpeg,image/gif" 
                            />
                        </button>
                    </div>

                    <div className="writeButton">
                    <Button 
                    text={"등록"}
                    type={"submitButton"}
                    onClick={()=>insert()}
                    postNo={postNo}
                    />

                    <Button 
                    text={"취소"}
                    type={"cancelButton"}
                    onClick={()=>{
                        navigate(`/community`)
                    }}
                    />
                    </div>
                </div>
            </div>
        </div>

       
    )
}



export default CommunityWrite;