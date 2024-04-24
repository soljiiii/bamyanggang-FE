import "./Party.css";

function Party ({party}) {

    if (party.master === 1) {
        return (
            <div className="partyContainer">
                <div className="partyInfo">
                    <div className="partyImg"></div>
                    <div className="partyState">
                        <span className="partyMaster">방장</span>
                    </div>
                    <div className="nickNmBox">
                        {party.userNickNm}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="partyContainer">
                <div className="partyInfo">                        
                    <div className="partyImg"></div>
                    <div className="partyState">
                        <span className="partyNormal">일반</span>
                    </div>
                    <div className="nickNmBox">
                        {party.userNickNm}                        
                    </div>
                </div>
            </div>
            );

    }
}

export default Party;
