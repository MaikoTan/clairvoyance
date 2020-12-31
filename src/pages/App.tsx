import "./App.css";

import { ActionMonitor, registerListeners } from "../utils/Monitor";
import React, { useEffect } from "react";

import { PartyMember } from "../components/common/party_menber";

const actionMonitor = new ActionMonitor();

const App: React.FC = () => {

  useEffect(() => {
    registerListeners(actionMonitor);
  });

  return (
    <div className="App">
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
      <PartyMember objectId="abcd" name="a b" shortName="a" job="blm" invalid={false} />
    </div>
  );
};

export default App;
