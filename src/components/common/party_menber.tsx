import React from "react";
import "./party_member.css";


interface PartyMemberProps {
  invalid: boolean;
  objectId: string;
  name: string;
  shortName: string;
  job: string;
}

const PartyMember: React.FC<PartyMemberProps> = (props: PartyMemberProps) => {

  const {
    name,
    shortName,
  } = props;

  return (
    <div className="party-member">
      <div> test {name} {shortName} </div>
    </div>
  );
};

export {
  PartyMember,
};
