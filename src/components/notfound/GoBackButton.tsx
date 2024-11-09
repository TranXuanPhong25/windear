import { LucideIcon } from "lucide-react";
import { createElement } from "react";
function GoBackButton({buttonText,icon,buttonOnClick}:{buttonText:string,icon:LucideIcon ,buttonOnClick:()=>void}) {
   return (
      <div className="flex w-full justify-center mt-8" data-aos="zoom-out-up" onClick={buttonOnClick}>
         <button className="cssbuttons-io-button dbutton">
            {buttonText}
         <div className="getcv-subicon">
            {createElement(icon)}
         </div>
      </button>
    </div >
  );
}

export default GoBackButton;