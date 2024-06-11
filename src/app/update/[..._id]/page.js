import Update from "@/components/Update";

const UpdatePage = ({ searchParams }) => {
  const { _id } = searchParams;
  console.log("This is update id", _id);
  return (
    <div>
      <Update id={_id} />
    </div>
  );
};

export default UpdatePage;
