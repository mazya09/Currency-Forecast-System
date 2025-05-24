import React from "react";
import Blockchildren from "../../components/blockchildren/blockchildren.tsx";
import Blockwrapper from "../../components/blockwrapper/blockwrapper.tsx";

export default function CommercialBankRates() {
  return (
    <Blockwrapper>
      <h1>Commercial Bank Rates</h1>
      <Blockchildren>
        <div className="block_convert"></div>
      </Blockchildren>
    </Blockwrapper>
  );
}
