import { useState } from "react";
import JobForm from "app/routes/components/JobForm";

export default function JobPost() {
  return (
    <div>
      <h1>Post a New Job</h1>
      <JobForm />
    </div>
  );
}
