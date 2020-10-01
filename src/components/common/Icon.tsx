import React from "react";

interface ApiDataState {
  Icon: string;
  Name: string;
}

interface IconProps {
  apiDataUrl: string;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { apiDataUrl } = props;
  const [ apiData, setApiData ] = React.useState<ApiDataState>();

  React.useEffect(() => {
    let current = true;
    void (async () => {
      const data = await (await fetch(`https://xivapi.com/${apiDataUrl}`, {
        mode: "cors"
      })).json();
      if (current) {
        setApiData(data);
      }
    })();

    return () => {
      current = false;
    };
  }, [apiDataUrl]);

  if (!apiData || !apiData.Icon) {
    return null;
  }

  return (
    <>
      <div>
        <img
          src={`https://xivapi.com/${apiData.Icon}`}
          alt={apiData.Name}
        />
      </div>
    </>
  );
};

export default Icon;
