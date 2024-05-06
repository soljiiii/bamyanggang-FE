import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./Community.css";
import axios from "axios";
import Button from "../../component/common/Button";

function CommunityModify(){
    const navigate = useNavigate();
    const {postNo} = useParams();
    const [selectedCommunity, setSelectedCommunity] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //수정할 정보 가져오기
    useEffect(()=>{
        axios.get(`http://localhost:3001/community?postNo=${postNo}`)
        .then(response=>{
            setSelectedCommunity(response.data[0]);
            setTitle(response.data[0].title);
            setContent(response.data[0].content);
        })

        .catch(error=>{
            console.error("데이터에러", error);
        })
    },[postNo]);

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

        //게시글 수정
        alert('게시글 수정');
        axios.post('http://localhost:3001/community',{
            //postNo는 나중에 삭제
            'title' : title,
            'content' : content,
            // 'img' : img

        }).then(function (response){
            navigate(`/community/${postNo}`);

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

export default CommunityModify;