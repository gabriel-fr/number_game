import { useEffect, useState } from "react";
import "./DigitalNumber.css";

interface IDigitalNumber {
  number: number;
  textDescription?: string;
  textColor?: string;
}

interface IObjectKeys {
  [key: number]: boolean[];
}

interface INumberPosition {
  position: any;
  top: number;
  right: string;
}

// A lógica utilizada para criar esse componente foi
//primeiro verificar o tamanho do número e separar cada parte

//Assim ele verifica qual o número que será exibido pela função verifyNumberLength()
//Essa função irá separar cada dígito e irá junta-los em um array de forma separada
//para que depois possa ser percorrido e setado no display conforme cada número
//e também define o estilo que o número deverá ter para ser exibido corretamente no espaço da tela

//A exibição é feita através da variavél allNumbers[] que irá retornar um array de true ou false
// indicando qual segmento deve estar ativo, e o a definição de ativo é feita através da cor do segmento

const DigitalNumbers = ({ number, textDescription, textColor }: IDigitalNumber) => {
  const [numberPosition, setNumberPosition] = useState<INumberPosition[]>([
    {
      position: "absolute",
      top: 0,
      right: "0px",
    },
  ]);
  const [slicedNumber, setSlicedNumbers] = useState([0]);

  const successColor = "#32BF00";
  const errorColor = "#CC3300";
  const isError = textColor === errorColor;
  const isSuccess = textColor === successColor;

  const allNumbers: IObjectKeys = {
    0: [true, true, true, true, true, false, true],
    1: [false, false, false, true, true, false, false],
    2: [true, false, true, true, false, true, true],
    3: [true, false, false, true, true, true, true],
    4: [false, true, false, true, true, true, false],
    5: [true, true, false, false, true, true, true],
    6: [true, true, true, false, true, true, true],
    7: [true, false, false, true, true, false, false],
    8: [true, true, true, true, true, true, true],
    9: [true, true, false, true, true, true, true],
  };

  const verifyNumberLength = () => {
    const numberString = number.toString();
    const length = numberString.length;

    const firstNumber = Number(numberString?.toString()?.slice(0, 1));
    const secondNumber = Number(numberString?.toString()?.slice(1, 2));
    const thirdNumber = Number(numberString?.toString()?.slice(2, 3));

    switch (length) {
      case 1:
        setSlicedNumbers([firstNumber]);
        break;
      case 2:
        setNumberPosition([
          {
            position: "absolute",
            top: 0,
            right: "40px",
          },
          {
            position: "absolute",
            top: 0,
            right: "-40px",
          },
        ]);
        setSlicedNumbers([firstNumber, secondNumber]);
        break;
      case 3:
        setNumberPosition([
          {
            position: "absolute",
            top: 0,
            right: "75px",
          },
          {
            position: "absolute",
            top: 0,
            right: "0px",
          },
          {
            position: "absolute",
            top: 0,
            right: "-75px",
          },
        ]);
        setSlicedNumbers([firstNumber, secondNumber, thirdNumber]);
        break;
    }
  };

  const setBackgroundColor = (index: number, position: number) => {
    if (allNumbers[slicedNumber[index]][position]) {
      if (isError) {
        return errorColor;
      }
      if (isSuccess) {
        return successColor;
      }
      return "black";
    }
    return "#DDDDDD";
  };

  useEffect(() => {
    verifyNumberLength();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <>
      <div className="number_container">
        <div className="textDescription" style={{ color: `${textColor}` }}>
          {textDescription}
        </div>
        <div className="numbers_display">
          {numberPosition.map((stylePosition, i) => {
            return (
              <div key={i} className="number-position" style={stylePosition}>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 0)}`,
                  }}
                  className="top"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 1)}`,
                  }}
                  className="left-up"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 2)}`,
                  }}
                  className="left-down"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 3)}`,
                  }}
                  className="rigth-up"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 4)}`,
                  }}
                  className="rigth-down"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 5)}`,
                  }}
                  className="midle"
                ></div>
                <div
                  style={{
                    backgroundColor: `${setBackgroundColor(i, 6)}`,
                  }}
                  className="bottom"
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DigitalNumbers;
