import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Card,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

const TABLE_HEAD = ["Name", "Mata Kuliah", "Index Nilai", "Action"];

// const TABLE_ROWS = [
//   {
//     name: "John Michael",
//     job: "Manager",
//     date: "23/04/18",
//   },
//   {
//     name: "Alexa Liras",
//     job: "Developer",
//     date: "23/04/18",
//   },
//   {
//     name: "Laurent Perrier",
//     job: "Executive",
//     date: "19/09/17",
//   },
//   {
//     name: "Michael Levi",
//     job: "Developer",
//     date: "24/12/08",
//   },
//   {
//     name: "Richard Gran",
//     job: "Manager",
//     date: "04/10/21",
//   },
// ];

const ManageTrainer = () => {
  const nameInput = useRef("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleOpen = (props) => {
    setOpen(!open);
    setSelectedData(props);
  };

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "name") {
      setSelectedData({ ...selectedData, name: value });
    } else if (name === "course") {
      setSelectedData({ ...selectedData, course: value });
    } else if (name === "score") {
      setSelectedData({ ...selectedData, score: value });
    }
  };

  const editData = () => {
    axios
      .put(
        `https://backendexample.sanbercloud.com/api/student-scores/${selectedData.id}`,
        {
          name: selectedData.name,
          course: selectedData.course,
          score: selectedData.score,
        }
      )
      .then((res) => {
        handleOpen();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    //fetch data dengan kondisi
    axios
      .get("https://backendexample.sanbercloud.com/api/student-scores")
      .then((res) => {
        console.log(res);
        setData([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const EditFormModal = () => {
    console.log(selectedData?.name);
    return (
      <>
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Sign In
              </Typography>
              <Typography
                className="mb-3 font-normal"
                variant="paragraph"
                color="gray"
              >
                Enter your email and password to Sign In.
              </Typography>
              <Typography className="-mb-2" variant="h6">
                Name
              </Typography>
              <Input
                name="name"
                value={selectedData?.name}
                onChange={(e) => handleInput(e)}
                label="Text"
                size="lg"
              />
              <Typography className="-mb-2" variant="h6">
                Course
              </Typography>
              <Input
                name="course"
                value={selectedData?.course}
                onChange={(e) => handleInput(e)}
                label="Text"
                size="lg"
              />
              <Typography className="-mb-2" variant="h6">
                Score
              </Typography>
              <Input
                name="score"
                value={selectedData?.score}
                onChange={(e) => handleInput(e)}
                label="Text"
                size="lg"
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={editData} fullWidth>
                Sign In
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                Don&apos;t have an account?
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="blue-gray"
                  className="ml-1 font-bold"
                  onClick={handleOpen}
                >
                  Sign up
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </Dialog>
      </>
    );
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => {
            const isLast = index === data.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={data?.name}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.course}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {data?.score}
                  </Typography>
                </td>
                <Button onClick={() => handleOpen(data)} className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    className="font-medium"
                  >
                    Edit
                  </Typography>
                </Button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <EditFormModal />
    </Card>
  );
};

export default ManageTrainer;
