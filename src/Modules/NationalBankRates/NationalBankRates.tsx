import React from "react";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";

export default function NationalBankRates() {
  return (
    <Blockwrapper>
      <h1>National Bank Rates</h1>
      <Blockchildren>
        <div className="block_convert"></div>
      </Blockchildren>
    </Blockwrapper>
  );
}
