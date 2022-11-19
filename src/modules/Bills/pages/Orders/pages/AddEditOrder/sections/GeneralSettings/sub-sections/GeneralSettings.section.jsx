import { Input } from "components";
import { Link } from "react-router-dom";
import "./styles.scss";

export const GS = ({ isView, ...props }) => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
      {props?.actionLink ? (
        <div className="flex gap-3 justify-end">
          {props?.actionLink.map((action) => (
            <Link
              to={action?.link}
              className="text-[#3699FF] text-[16px] hover:text-[#0BB783]"
            >
              {action?.text}
            </Link>
          ))}
        </div>
      ) : null}
      <Input
        name="name"
        placeholder="Product Name"
        label="Product Name"
        className="mb-[20px]"
        disabled={isView}
      />
      <Input
        name="description"
        placeholder="Product Description"
        label="Product Description"
        type="textarea"
        rows={4}
        disabled={isView}
      />
      {/* {!isView && (
        <Button type="ghost" className="h-[52px] mt-[32px]" htmlType="submit">
          Save Changes
        </Button>
      )} */}
    </div>
  );
};
