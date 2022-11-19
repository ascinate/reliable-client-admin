import { Input } from "components";
import "./styles.scss";

export const GS = () => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] rounded-[8px]">
      <Input
        name="name"
        placeholder="Template Name"
        label="Template Name"
        className="mb-[20px]"
      />
      <Input
        name="description"
        placeholder="Template Description"
        label="Template Description"
        type="textarea"
        rows={4}
      />
      <Input
        name="productName"
        placeholder="Product Name"
        label="Product Name"
        className="mb-[20px] mt-[20px]"
      />
      <Input
        name="productDescription"
        placeholder="Product Description"
        label="Product Description"
        type="textarea"
        rows={4}
      />
    </div>
  );
};
