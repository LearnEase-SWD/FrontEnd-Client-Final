import { SearchOutlined } from "@ant-design/icons";
import { Input, Form, Select, Button } from "antd";
import { useState } from "react";


export interface SelectField {
  name: string;
  options: Array<{ value: string; label: string; dependence?: string }>;
  placeholder?: string;
  dependenceName?: string; // Name of the dependence Select field
  onChange?: (value:string) => void;
}

interface GlobalSearchUnitProps {
  placeholder: string;
  selectFields?: SelectField[]; // Array of dynamic Select fields
  onSubmit: (values: Record<string, unknown>) => void; // Callback to get values from the input fields
  isDependentSelect?: boolean; // Flag to enable dependent Select field
}

const GlobalSearchUnit = ({
  selectFields,
  onSubmit,
  placeholder,
  isDependentSelect,
}: GlobalSearchUnitProps) => {
  const [form] = Form.useForm();
  const [trackFormFields, setTrackFormFields] =
    useState<Record<string, unknown>>();

  const updateTracker = (isDelete: boolean) => {
    if (isDependentSelect) {
      setTrackFormFields(form.getFieldsValue);
    }

    if (isDelete && isDependentSelect) {
      const keyword = form.getFieldValue("keyword");
      form.resetFields();
      form.setFieldsValue({ keyword: keyword });
    }
  };

  return (
    <Form form={form} className="flex flex-row max-w-full space-x-4 ">
      <Form.Item name="keyword">
        <Input
          allowClear
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          className="rounded-sm w-full max-w-80"
          onPressEnter={() => {
            onSubmit(form.getFieldsValue());
          }}
        />
      </Form.Item>

      <SelectFields
        selectFields={selectFields}
        trackFormFields={trackFormFields}
        trackChange={updateTracker}
      />

      <Button
        shape="round"
        type="primary"
        className="items-center"
        onClick={() => onSubmit(form.getFieldsValue())}
        icon={<SearchOutlined />}
      >
        Search
      </Button>
    </Form>
  );
};

export default GlobalSearchUnit;

const SelectFields = ({
  selectFields,
  trackFormFields,
  trackChange,
}: {
  selectFields?: SelectField[];
  trackFormFields?: Record<string, unknown>;
  trackChange: (isDelete: boolean) => void;
}) => {
  return (
    <>
      {selectFields?.map((field) =>
        field.dependenceName ? (
          <Form.Item key={field.name} name={field.name}>
            <Select
              // onClick={() => field.onClick && field.onClick()}
              showSearch
              disabled={trackFormFields?.[field.dependenceName] === undefined}
              allowClear
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              placeholder={field.placeholder ?? `Select ${field.name}`}
              className="custom-selector min-w-40  max-w-40"
              options={field.options.map((option) => ({ label: option.label, value: option.value }))}
            >
            </Select>
          </Form.Item>
        ) : (
          <Form.Item key={field.name} name={field.name}>
            <Select
              allowClear
              showSearch
              optionFilterProp="label"

              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              placeholder={field.placeholder ?? `Select ${field.name}`}
              className="custom-selector   min-w-40  max-w-40"
              onChange= {(value) => {
                if (field.onChange && value !== undefined) field.onChange(value); 
                trackChange(false);
              }}
              onClear={() => trackChange(true)}
              options={field.options.map((option) => ({ label: option.label, value: option.value }))}
              >
            </Select>
          </Form.Item>
        )
      )}
    </>
  );
};
