import React from "react";
import { PartyMember } from "../components/common/party_menber";
import "./App.css";


const App: React.FC = () => {

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
