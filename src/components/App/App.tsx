import React, { useEffect, useMemo, useState } from "react";
import { Input, Button } from "antd";
import styles from "./App.module.css";
import { getUserAPI } from "@/api/User";
type Props = {};

const App = (props: Props) => {
  const [text, setText] = useState<any>("");
  const [listUser, setlistUser] = useState<any>("");
  const [listUserSearch, setlistUserSearch] = useState<any>([]);

  const handleSearch = useMemo(
    () => (event: any) => {
      const searchText = event.target.value;
      setText(searchText);
      const data = listUserSearch?.filter((item: any) => {
        return (
          item?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          item?.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          item?.phone?.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setlistUser(data);
    },
    [text]
  );

  const getUser = async () => {
    const res = await getUserAPI();
    setlistUser(res);
    setlistUserSearch(res);
  };

  useEffect(() => {
    getUser();
    return () => {};
  }, []);
  return (
    <div className={styles.Container}>
      <div className={styles.name}>
        My APP
      </div>
      <div className={styles.Csearch}>
        <Input
          placeholder="Nhập tên người dùng"
          value={text}
          onChange={handleSearch}
        />
      </div>
      <div className={styles.listUser}>
        {listUser.length > 0 &&
          listUser?.map((item: any, index: number) => {
            return (
              <ul key={item?.id}>
                <li>
                  name: {item?.name} - email:{item?.email} - Phone:{" "}
                  {item?.phone}
                </li>
              </ul>
            );
          })}
      </div>
    </div>
  );
};

export default App;
