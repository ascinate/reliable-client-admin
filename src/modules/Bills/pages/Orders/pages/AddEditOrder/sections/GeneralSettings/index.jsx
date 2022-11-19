import { GS, LineItems, Note } from "./sub-sections";
// import { AdvancedSettings } from "../AdvancedSettings";
import { Button } from "components";

export const GeneralSettings = ({ isView }) => {
  return (
    <div>
      <GS />
      <LineItems />
      <Note />
      {/* <AdvancedSettings /> */}
      <div className="text-right ">
        {!isView && (
          <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
};
