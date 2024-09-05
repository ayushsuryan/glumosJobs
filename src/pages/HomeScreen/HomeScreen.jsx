import Header from "../../components/Header/Header";
import styles from "../HomeScreen/homescreen.module.css";
import { SearchOutlined } from "@ant-design/icons";
import { fetchJobsRequest } from "../../store/features/jobs/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Button, Input, Space } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card, Flex } from "antd";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector((state) => state.jobs.jobs);

  // State for input fields
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  // Handle form submission
  const handleSearch = () => {
    dispatch(fetchJobsRequest({ query, location }));
  };

  return (
    <div className={styles.container}>
      <Header></Header>
      <div className={styles.homeContainer}>
        <div className={styles.inputContainer}>
          <h1>Find fulltime Jobs.</h1>
          <h2>
            Glumos is your one-stop-center for thousands of fulltime jobs.
          </h2>

          <Space.Compact size="large">
            <Input
              onChange={(e) => setQuery(e.target.value)}
              addonBefore={<SearchOutlined />}
              placeholder="Job Title"
            />
            <Input
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Country"
            />
          </Space.Compact>
          <Button onClick={() => handleSearch()} type="dashed">
            Search
          </Button>
        </div>
        <div className={styles.imageContainer}>
          <img src="../src/assets/homeStock.png" alt="Home" />
        </div>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {jobs && jobs.length > 0 && (
          <div className={styles.jobResultContainer}>
            {jobs.map((job, index) => (
              <div key={index}>
                <Flex gap="middle" align="start" vertical>
                  <Card
                    loading={loading}
                    style={{
                      width: 300,
                    }}
                  >
                    <Card.Meta
                      onClick={() => {
                        window.open(job.jobProviders[0].url, "_blank");
                      }}
                      avatar={<Avatar src={job.image} />}
                      title={job.title}
                      description={
                        <>
                          <p style={{ color: "blue" }}>
                            {job.company.slice(0, 25)}...
                          </p>
                          <p>{job.description.slice(0, 200)}...</p>
                        </>
                      }
                    />
                  </Card>
                </Flex>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
