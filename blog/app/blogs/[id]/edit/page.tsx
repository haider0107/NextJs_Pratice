import FormUpdate from "@/components/FormUpdate"
import { FC } from "react";

interface BlogIdProps {
    params: {
      id: string;
    };
  }

const page: FC<BlogIdProps> = ({params}) => {
  return (
    <div>
        <FormUpdate params={params}/>
    </div>
  )
}

export default page