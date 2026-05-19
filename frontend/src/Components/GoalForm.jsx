import { useEffect, useState } from "react";
import API from "../services/api";

function GoalForm() {

  // GOALS STATE

  const [goals, setGoals] = useState([]);

  // FORM STATE

  const [formData, setFormData] = useState({

    title: "",

    target: "",

    weightage: "",

  });

  // LOAD GOALS

  useEffect(() => {

    fetchGoals();

  }, []);

  // FETCH GOALS

  async function fetchGoals() {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await API.get(

          "/goals",

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }

        );

      setGoals(response.data);

    }

    catch (error) {

      console.log(error);

    }

  }

  // HANDLE INPUT

  function handleChange(e) {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  }

  // TOTAL WEIGHTAGE

  const totalWeightage = goals.reduce(

    (sum, goal) =>

      sum + Number(goal.weightage),

    0

  );

  // ADD GOAL

  async function addGoal(e) {

    e.preventDefault();

    // MAX GOALS

    if (goals.length >= 8) {

      alert("Maximum 8 goals allowed");

      return;

    }

    // MIN WEIGHTAGE

    if (Number(formData.weightage) < 10) {

      alert("Minimum weightage is 10%");

      return;

    }

    // TOTAL WEIGHTAGE

    if (

      totalWeightage +

      Number(formData.weightage) > 100

    ) {

      alert(
        "Total weightage cannot exceed 100%"
      );

      return;

    }

    try {

      const token =
        localStorage.getItem("token");

      await API.post(

        "/goals",

        formData,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

      // RELOAD GOALS

      fetchGoals();

      // RESET FORM

      setFormData({

        title: "",

        target: "",

        weightage: "",

      });

    }

    catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message
      );

    }

  }

  // DELETE GOAL

  async function deleteGoal(id) {

    try {

      const token =
        localStorage.getItem("token");

      await API.delete(

        `/goals/${id}`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

      // RELOAD GOALS

      fetchGoals();

    }

    catch (error) {

      console.log(error);

    }

  }

  // UPDATE ACHIEVEMENT

  async function updateAchievement(
    goal,
    value
  ) {

    const achievement =
      Number(value);

    const progress =
      Math.min(

        100,

        Math.round(

          (
            achievement /

            Number(goal.target)

          ) * 100

        )

      )

    ;

    // STATUS

    let status =
      "Not Started";

    if (progress === 100) {

      status = "Completed";

    }

    else if (progress > 0) {

      status = "On Track";

    }

    try {

      const token =
        localStorage.getItem("token");

      await API.put(

        `/goals/${goal._id}`,

        {
          achievement,
          progress,
          status,
        },

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

      // RELOAD GOALS

      fetchGoals();

    }

    catch (error) {

      console.log(error);

    }

  }

  return (

    <div>

      {/* CREATE GOAL */}

      <div className="bg-white p-8 rounded-xl shadow mb-8">

        <h2 className="text-2xl font-bold mb-6">

          Create Goal

        </h2>

        <form
          onSubmit={addGoal}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >

          <input
            type="text"
            name="title"
            placeholder="Goal Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="target"
            placeholder="Target"
            value={formData.target}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="number"
            name="weightage"
            placeholder="Weightage %"
            value={formData.weightage}
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded hover:bg-blue-700 md:col-span-3"
          >

            Add Goal

          </button>

        </form>

      </div>

      {/* SUMMARY */}

      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <div className="flex justify-between">

          <h2 className="text-2xl font-bold">

            Goal Summary

          </h2>

          <div className="text-xl font-semibold">

            Total Weightage:

            <span className="text-blue-600 ml-2">

              {totalWeightage}%

            </span>

          </div>

        </div>

      </div>

      {/* GOALS TABLE */}

      <div className="bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">

          Goals List

        </h2>

        {
          goals.length === 0 ? (

            <p>No goals added yet.</p>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="bg-gray-100">

                  <th className="p-4 text-left">
                    Goal
                  </th>

                  <th className="p-4 text-left">
                    Target
                  </th>

                  <th className="p-4 text-left">
                    Weightage
                  </th>

                  <th className="p-4 text-left">
                    Achievement
                  </th>

                  <th className="p-4 text-left">
                    Progress
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {goals.map((goal, index) => (

                  <tr
                    key={index}
                    className="border-b"
                  >

                    <td className="p-4">
                      {goal.title}
                    </td>

                    <td className="p-4">
                      {goal.target}
                    </td>

                    <td className="p-4">
                      {goal.weightage}%
                    </td>

                    <td className="p-4">

                      <input
                        type="number"
                        value={
                          goal.achievement || 0
                        }
                        onChange={(e) =>
                          updateAchievement(
                            goal,
                            e.target.value
                          )
                        }
                        className="border p-2 rounded w-24"
                      />

                    </td>

                    <td className="p-4">

                      <div className="w-40 bg-gray-200 rounded-full h-4">

                        <div
                          className="bg-green-500 h-4 rounded-full"
                          style={{
                            width: `${goal.progress || 0}%`,
                          }}
                        />

                      </div>

                      <p className="text-sm mt-1">

                        {goal.progress || 0}%

                      </p>

                    </td>

                    <td className="p-4">

                      <span
                        className={
                          goal.status === "Completed"
                            ? "px-3 py-1 rounded text-white text-sm bg-green-500"
                            : goal.status === "On Track"
                            ? "px-3 py-1 rounded text-white text-sm bg-yellow-500"
                            : "px-3 py-1 rounded text-white text-sm bg-gray-500"
                        }
                      >

                        {goal.status || "Not Started"}

                      </span>

                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          deleteGoal(goal._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >

                        Delete

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )
        }

      </div>

    </div>

  );

}

export default GoalForm;