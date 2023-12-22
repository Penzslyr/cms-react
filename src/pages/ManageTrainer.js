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
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  const handleOpen = (props) => {
    setOpen(!open);
    setSelectedData(props);
  };

  const handleInput = (event) => {
    event.preventDefault();
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

  const FormModal = React.memo((props) => {
    console.log("rerendering...");
    console.log("ini props", props);
    const [nameInput, setNameInput] = useState(props.selectedData?.name);
    const [courseInput, setCourseInput] = useState(props.selectedData?.course);
    const [scoreInput, setScoreInput] = useState(props.selectedData?.score);

    const editData = () => {
      axios
        .put(
          `https://backendexample.sanbercloud.com/api/student-scores/${selectedData.id}`,
          {
            name: nameInput,
            course: courseInput,
            score: scoreInput,
          }
        )
        .then((res) => {
          handleOpen();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Edit Data
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            Masukan data yang ingin diubah
          </Typography>
          <Input
            name="name"
            label="NAME"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            size="lg"
          />

          <Input
            label="COURSE"
            name="course"
            value={courseInput}
            onChange={(event) => setCourseInput(event.target.value)}
            size="lg"
          />

          <Input
            label="SCORE"
            name="score"
            value={scoreInput}
            onChange={(event) => setScoreInput(event.target.value)}
            size="lg"
          />
        </CardBody>
        <CardFooter className="pt-0">
          <div class="flex space-x-4">
            <button
              class="flex-1 select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              onClick={() => handleOpen()}
            >
              Cancel
            </button>
            <button
              class="flex-1 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
              type="button"
              onClick={() => editData()}
            >
              Submit
            </button>
          </div>
        </CardFooter>
      </Card>
    );
  });

  const EditFormModal = () => {
    return (
      <Dialog
        size="xs"
        open={open}
        handler={() => handleOpen()}
        className="bg-transparent shadow-none"
      >
        <FormModal selectedData={selectedData} />
      </Dialog>
    );
  };

  return (
    <Card className="min-h-[100vh] min-w-[185vh]">
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
                <td className={classes}>
                  {" "}
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
                </td>
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
