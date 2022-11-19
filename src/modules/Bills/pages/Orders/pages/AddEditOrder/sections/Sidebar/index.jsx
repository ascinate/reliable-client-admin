import {
  // ProductDetails,
  Status,
  Thumbnail,
  ChooseTemplate,
} from "./sub-sections";

export const Sidebar = () => {
  return (
    <div>
      <ChooseTemplate />
      <Thumbnail />
      <Status />
      {/* <ProductDetails /> */}
    </div>
  );
};
