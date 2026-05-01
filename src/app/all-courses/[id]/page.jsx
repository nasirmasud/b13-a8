
const CourseDetailsPage = async ({ params }) => {
  const { id } = await params
  console.log(id);

  return (
    <div>
      Course Details Page
    </div>
  )
}

export default CourseDetailsPage
