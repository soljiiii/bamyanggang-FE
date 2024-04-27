import React from "react";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import "./Guide.css"

function Guide(){
    return(
        <div>
            <div className="guideBack">
                <Header />
                <SubBanner />
                <div className="guide">
                    <div>내가 바로 갱(Gang)스터!!</div>
                    <div><img src="/images-jsx/마피아양.svg" /></div>
                    <div>참여자</div>
                    <div>게임 방법</div>
                    <div>마무리</div>
                </div>
            </div>

        </div>    
    )
}

export default Guide;