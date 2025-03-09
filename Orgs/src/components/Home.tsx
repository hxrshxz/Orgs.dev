import React, { useEffect, useState } from "react";
import "./styles/home.css";
import axios from "axios";
import LoadingLoader from "./styles/styled-components/loader";
// Define the type for the organization objects
type Organization = {
  name: string;
};

const Home = () => {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/");
        setOrgs(res.data); // Ensure this is an array of Organization
      } catch (err) {
        setError("Failed to fetch organizations.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgs();
  }, []);

  return (
    <div>
      <h2>Home</h2>
      {loading && <LoadingLoader />}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {orgs.slice(0, 9).map((org, index) => (
          <li key={index}>{org.name || "Unnamed Organization"}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
