import React from "react";
import Header from "../../layouts/Header";
import SubBanner from "../../layouts/SubBanner";
import "./Guide.css";

function Guide() {
    return (
        <div>
            <div className="guideBack">
                <Header />
                <SubBanner />
                <div className="guide">

                    <div className="subtitle">게임 가이드</div>
                    <div className="text1">
                        <div className="part3">피도 눈물도 없는 양갱이 양들의 마을에 침입하였다!!!</div>
                        <div className="part2">과연 양들은 살아남을 수 있을까..?</div>
                        <div className="part">투표의 힘으로 마을을 지켜내자!!</div>
                    </div>
                    <div className="image-container">
                        <div className="yanggang">
                            <img src="/images-jsx/마피아양.svg" alt="양갱이" />
                        </div>
                        <div className="yang">
                            <img src="/images-jsx/두떨양1.png" alt="두떨양1" />
                            <img src="/images-jsx/두떨양2.png" alt="두떨양2" />
                            <img src="/images-jsx/두떨양3.png" alt="두떨양3" />
                            <img src="/images-jsx/두떨양4.png" alt="두떨양4" />
                            <img src="/images-jsx/두떨양5.png" alt="두떨양5" />
                        </div>
                    </div>
                    <div className="guidecontent">
                        <div className="text2">게임 방법</div>
                        <div className="text3">참여인원 최소 6인이다.</div>
                        <div className="text4">1. 양갱 1마리 양 5마리 낮 시간에 누가 양갱인지 투표를 할 수 있다. 양갱을 맞추게 되면 양들의 승리!!</div>
                        <div className="text5">2. 밤 시간에 양갱이 한 마리의 양을 지목하여 양을 죽일 수 있다. 양과 양갱의 숫자가 동일할 때 양갱의 승리!!</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Guide;