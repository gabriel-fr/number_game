import { useEffect, useState } from "react";
import DigitalNumbers from "../digitalNumbers/DigitalNumber";
import "./Counter.css";

function Counter() {
  const [number, setNumber] = useState<Number>(1);
  const [attemptNumber, setAttemptNumber] = useState<number>(0);
  const [error, setError] = useState(null);
  const [tryStatus, setTryStatus] = useState("");
  const [tryText, setTryText] = useState("");
  const [insertedNumber, setInsertedNumber] = useState(0);
  const [isButtonReloadVisible, setIsButtonReloadVisible] = useState(false);

  const refreshIcon = require("../../utils/images/refresh.png");

  const fetchNumber = async () => {
    fetch("https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300")
      .then((res) => res.json())
      .then((e) => {
        if (e?.Error) {
          setError(e.StatusCode);
          setTryStatus("error");
          setIsButtonReloadVisible(true);
        }
        setNumber(e.value);
      });
  };

  const verifyNumber = () => {
    if (insertedNumber > 300) {
      alert("O número não pode ser maior que 300!");
      return;
    }
    if (insertedNumber <= 0) {
      alert("O número não pode ser menor ou igual que 0!");
      return;
    }
    if (insertedNumber > number) {
      setTryText("É menor");
      setAttemptNumber(insertedNumber);
    }
    if (insertedNumber < number) {
      setTryText("É maior");
      setAttemptNumber(insertedNumber);
    }
    if (insertedNumber === number) {
      setTryText("Você acertou!!!");
      setAttemptNumber(insertedNumber);
      setTryStatus("success");
      setIsButtonReloadVisible(true);
    }
  };

  const setColorText = () => {
    if (tryStatus === "error") {
      return "#CC3300";
    }
    if (tryStatus === "success") {
      return "#32BF00";
    }
    return "#FF6600";
  };

  const handleKeyboardEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("AAAAAAA");
    if (event.key === "Enter") {
      verifyNumber();
    }
  };

  useEffect(() => {
    fetchNumber();
  }, []);

  return (
    <>
      <div className="align">
        <div className="counter_container">
          <div className="title">QUAL É O NÚMERO?</div>
          <hr />
          <DigitalNumbers
            textColor={setColorText()}
            textDescription={error ? "ERRO" : tryText}
            number={error || attemptNumber}
          />
          {isButtonReloadVisible && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button onClick={() => window.location.reload()} className="play_again">
                <img src={refreshIcon} style={{ marginRight: 7 }} alt="Refresh Icon" />
                NOVA PARTIDA
              </button>
            </div>
          )}
          <div className="input_container">
            <input
              placeholder="Digite o palpite"
              maxLength={3}
              type="number"
              onChange={({ target: { value } }) => setInsertedNumber(Number(value))}
              onKeyDown={(event) => handleKeyboardEvent(event)}
            />
            <button className="send_button" onClick={() => verifyNumber()}>
              ENVIAR
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Counter;
