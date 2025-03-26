import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Input,
  Space,
  Card,
  Modal,
  FormProps,
  Tooltip,
  TableProps,
} from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { previewInstructor } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { User } from "../../models/UserModel";
import { UserSearchParams } from "../../models/SearchInfo.model";
import GlobalSearchUnit from "../../components/GlobalSearchUnit";
import { getUsersRequestData } from "../../redux/slices/userSlice";
const initializeSearchParam: UserSearchParams = {
  searchCondition: {
    keyword: "",
    role: "instructor",
    status: true,
    is_delete: false,
    is_verified: false,
  },
  pageInfo: { pageNum: 1, pageSize: 10 },
};
const RequestUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector(
    (state: RootState) => state.users.previewProfile
  );
  const { listRequest } = useSelector(
    (state: RootState) => state.users.requestedUser
  );
  const [reasonVisible, setReasonVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [reason, setReason] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams, setSearchParams] = useState<UserSearchParams>(
    initializeSearchParam
  );

  useEffect(()=>{
    dispatch(getUsersRequestData(searchParams))
  },[searchParams])


  // const fetchUsers = async () => {
  //   const response = await UserService.getUsers(searchParams);
  //   const responseData = response.data?.pageData;

  //   const flattenedUsers: User[] = Array.isArray(responseData)
  //     ? responseData.flat()
  //     : [];

  //   setUsers(
  //     flattenedUsers
  //       .slice()
        // .sort(
        //   (a, b) =>
        //     dayjs(b.updated_at).valueOf() - dayjs(a.updated_at).valueOf()
        // )
  //   );
  //   setTotal(response.data?.pageInfo?.totalItems ?? 0);
  // };



  const handleTableChange = (pagination: any) => {
    setPageNum(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleShowReason = (record: any) => {
    setCurrentUser(record);
    setReasonVisible(true);
  };

  const handleSubmitPreview = async (status: string, record: any) => {
    const formPreview = {
      user_id: record._id,
      status,
      comment: reason,
    };
    // const listUserFilterAfterChange = listRequest.pageData?.sort(
    //   (a, b) =>
    //     dayjs(b.updated_at).valueOf() - dayjs(a.updated_at).valueOf()
    // )
    await previewInstructor(formPreview, dispatch);
    // await fetchUsers();
    // message.success("Submit preview successfully");
    setReasonVisible(false);
 
    console.log(formPreview);
  };

  const handleSearch: FormProps["onFinish"] = (values) => {
    setSearchParams((prev) => ({
      ...prev,
      searchCondition: {
        ...prev.searchCondition,
        keyword: values.keyword,
      },
    }));
  };

  const columns: TableProps<User>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar_url",
      render: (avatar_url: string) => (
        <div className="h-full w-full md:w-[100px] ">
          <img
            src={avatar_url}
            alt={avatar_url}
            className="w-[200px] h-[100px] rounded-full"
          />
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      align: "center",
    },
    {
      title: "Actions",
      align: "center",
      key: "action",
      render: (record: User) => (
        <>
          {/* {isPreviewSubmitted && record.status ? (
            <Tag color="primary">Previewed</Tag> // when submit successfully display button
          ) : ( */}
          <Space size="middle">
            <Tooltip title="Accept">
              <Button
                type="text"
                className="text-green-600"
                icon={<CheckOutlined />}
                onClick={() => handleSubmitPreview("approve", record)}
              />
            </Tooltip>
            <Tooltip title="Reject">
              <Button
                className="text-red-600"
                type="text"
                icon={<CloseOutlined />}
                onClick={() => handleShowReason(record)}
              />
            </Tooltip>
          </Space>
          {/* )} */}
        </>
      ),
    },
  ];

  return (
    <div>
      <Card>
        <div className="flex">
          <h3 className="text-2xl my-5">Request Instructor Management</h3>
        </div>
        <GlobalSearchUnit
          placeholder="Search By User Name"
          onSubmit={handleSearch}
        />
        <Table
          dataSource={listRequest.pageData}
          pagination={{
            current: pageNum,
            pageSize,
            total:listRequest.pageInfo?.totalItems,
            showSizeChanger: true,
          }}
          columns={columns}
          rowKey="_id"
          bordered
          style={{ borderRadius: "8px" }}
          scroll={{ x: true }}
          onChange={handleTableChange}
        />
      </Card>
      <Modal
        title="Reject Reason"
        open={reasonVisible}
        onCancel={() => setReasonVisible(false)}
        footer={[
          <Button
            color="primary"
            key="submit"
            variant="solid"
            htmlType="submit"
            onClick={() => handleSubmitPreview("reject", currentUser)}
            loading={loading}
          >
             <span>Submit</span>
          </Button>,
        ]}
      >
        <Input.TextArea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{ height: "100px" }}
          placeholder="Comment here..."
        />
      </Modal>
    </div>
  );
};

export default RequestUser;
