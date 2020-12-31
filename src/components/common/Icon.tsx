import React, { useEffect, useRef, useState } from "react";
import "./Icon.css";


interface ApiDataState {
  Icon: string;
  Name: string;
}

interface IconProps {
  apiDataUrl: string;
  text?: string;
  invalid?: boolean;
}

const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { apiDataUrl, text, invalid } = props;
  const [apiData, setApiData] = React.useState<ApiDataState>();

  React.useEffect(() => {
    let current = true;
    void (async () => {
      const data = await (await fetch(`https://xivapi.com/${apiDataUrl}?columns=ID,Name,Icon`, {
        mode: "cors"
      })).json();
      if (current) {
        setApiData(data);
      }
    })();

    return () => {
      current = false;
    };
  }, [apiDataUrl, text]);

  if (!apiData || !apiData.Icon) {
    return null;
  }

  const classnames = [
    "icon",
    invalid ? "invalid": "",
  ];

  return (
    <>
      <div className={classnames.join(" ")}>
        <img
          src={`https://xivapi.com/${apiData.Icon}`}
          alt={apiData.Name}
        />
        <span className="text">{text ? text : ""}</span>
      </div>
    </>
  );
};

interface ActionIconProps {
  actionId: number;
  cooldown: number;
}

const TimedActionIcon: React.FC<ActionIconProps> = (props: ActionIconProps) => {

  const { actionId, cooldown } = props;

  const endTime = useRef<number>(Date.now() + (cooldown || 0) * 1000);
  const [cd, setCd] = useState(Number(cooldown));

  useEffect(() => {
    if (cooldown && cd >= 0) {
      const timer = setTimeout(() => {
        setCd((endTime.current - Date.now()) / 1000);
      }, 30);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [cd, cooldown]);

  return (
    <>
      <Icon
        apiDataUrl={`Action/${actionId}`}
        text={`${(cooldown && cd > 0) ? Math.ceil(cd).toFixed() : ""}`}
        invalid={cd > 0}
      />
    </>
  );
};


export {
  Icon,
  TimedActionIcon,
};
