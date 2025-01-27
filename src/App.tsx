import React from "react";

interface Color {
  id: number;
  value: string;
}

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {
  paramValues: { [key: number]: string };
  colors: { [key: number]: string };
}

class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const initialValues = props.model.paramValues.reduce((acc, paramValue) => {
      acc[paramValue.paramId] = paramValue.value;
      return acc;
    }, {} as { [key: number]: string });
    
    const initialColors = props.model.colors.reduce((acc, color) => {
      acc[color.id] = color.value;
      return acc;
    }, {} as { [key: number]: string });

    this.state = {
      paramValues: initialValues,
      colors: initialColors,
    };
  }

  handleParamChange = (paramId: number, value: string) => {
    this.setState((prevState) => ({
      paramValues: {
        ...prevState.paramValues,
        [paramId]: value,
      },
    }));
  };

  handleColorChange = (colorId: number, value: string) => {
    this.setState((prevState) => ({
      colors: {
        ...prevState.colors,
        [colorId]: value,
      },
    }));
  };

  public getModel(): Model {
    const { paramValues, colors } = this.state;

    const paramValuesArray = Object.keys(paramValues).map((paramId) => ({
      paramId: Number(paramId),
      value: paramValues[Number(paramId)],
    }));

    const colorsArray = Object.keys(colors).map((colorId) => ({
      id: Number(colorId),
      value: colors[Number(colorId)],
    }));

    return {
      ...this.props.model,
      paramValues: paramValuesArray,
      colors: colorsArray,
    };
  }

  render() {
    const { params } = this.props;
    const { paramValues, colors } = this.state;

    return (
      <div>
        <h3>Параметры</h3>
        {params.map((param) => (
          <div key={param.id}>
            <label>{param.name}
              <input
                style={{margin: '10px'}}
                type="text"
                value={paramValues[param.id] || ""}
                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
              />
            </label>
          </div>
        ))}

        <h3>Цвета</h3>
        {this.props.model.colors && this.props.model.colors.map((color) => (
          <div key={color.id}>
            <label>Цвет #{color.id}
              <input
                style={{margin: '10px'}}
                type="color"
                value={colors[color.id] || "#ffffff"}
                onChange={(e) => this.handleColorChange(color.id, e.target.value)}
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

const App: React.FC = () => {
  const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" },
  ];

  const model: Model = {
    paramValues: [
      { paramId: 1, value: "повседневное" },
      { paramId: 2, value: "макси" },
    ],
    colors: [
      { id: 1, value: "#ff0000" },
      { id: 2, value: "#000000" },
    ],
  };

  const paramEditorRef = React.useRef<ParamEditor>(null);

  const handleGetModel = () => {
    if (paramEditorRef.current) {
      const updatedModel = paramEditorRef.current.getModel();
      console.log("Updated Model:", updatedModel);
    }
  };

  return (
    <div>
      <ParamEditor ref={paramEditorRef} params={params} model={model} />
      <button onClick={handleGetModel}>Изменить модель</button>
    </div>
  );
};

export default App;
