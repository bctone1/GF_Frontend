import { useState } from "react";
import axios from "axios";

export default function SMS() {
    const [to, setTo] = useState("");
    const [message, setMessage] = useState("");

    const sendSMS = async (e) => {
        e.preventDefault(); // 폼 기본 동작(새로고침) 방지

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/course/sms`,
                {
                    to: to,
                    message: message,
                }
            );

            console.log("응답:", response.data);
        } catch (err) {
            console.error("SMS 오류:", err);
        }
    };

    return (
        <div>
            <h1>SMS</h1>
            <form onSubmit={sendSMS}>
                <input
                    type="text"
                    name="to"
                    placeholder="전화번호"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />

                <input
                    type="text"
                    name="message"
                    placeholder="메시지"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button type="submit">SMS 보내기</button>
            </form>
        </div>
    );
}
