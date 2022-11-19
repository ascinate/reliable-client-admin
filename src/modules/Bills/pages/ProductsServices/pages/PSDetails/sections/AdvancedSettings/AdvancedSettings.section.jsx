import { Button, DatePicker } from "components";

const fields = [
  { label: "Next Due Date", name: "nextDueDate", disabled: false },
  { label: "Termination Date", name: "terminationDate", disabled: false },
  {
    label: "Override Suspension Date",
    name: "overrideSuspensionDate",
    disabled: false,
  },
  {
    label: "Override Termination Date",
    name: "overrideTerminationDate",
    disabled: false,
  },
];

const DateTitle = ({ title, name, disabled }) => {
  return (
    <div>
      <label className="mb-[16px] text-white text-[14px] font-normal">
        {title}
      </label>
      <DatePicker
        name={name}
        hideTime
        format="MM/DD/YYYY"
        disabled={disabled}
        className="disabled:bg-[#323248] disabled:text-[#92928F]"
      />
    </div>
  );
};

export const AdvancedSettings = () => {
  return (
    <div className="bg-[#1E1E2D] p-[32px] mt-[20px] rounded-[8px]">
      <h6 className="text-white text-[16px] font-medium mb-[32px]">
        Advanced Settings
      </h6>
      <div className="grid grid-cols-2 gap-[32px]">
        <div className="col-span-full">
          <DateTitle
            name="registrationDate"
            title="Registration Date"
            // disabled
          />
        </div>
        {fields?.map((field) => {
          return (
            <DateTitle
              key={field?.name}
              name={field?.name}
              title={field?.label}
              disabled={field?.disabled}
            />
          );
        })}
      </div>
      <Button type="ghost" htmlType="submit" className="mt-[32px] h-[52px]">
        Save Changes
      </Button>
    </div>
  );
};
