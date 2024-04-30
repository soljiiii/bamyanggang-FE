//text: 버튼에 들어갈 글자
//type: class네임 (css속성명)
//onClick: 버튼이 수행할 기능 (각자 정의)

function Button({text, type, onClick}){
    return(
        <button className={type} onClick={onClick}>
            {text}
        </button>
    );
}
export default Button;