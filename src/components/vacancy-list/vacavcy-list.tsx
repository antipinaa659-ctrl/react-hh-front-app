import { useGetVacancies } from "../../api-methods/get-vacavcies";
import type { VacancyModel } from "../../lib/types";

interface VacancyListProps{
    editedVacancy: VacancyModel;
}

export const VacancyList = () => {

    const {data: vacancyes, isLoading} = useGetVacancies();

    return <div>{vacancyes?.map(v=> <div>{v.title} {"-(" + v.city +")"} {v.salary} </div>)}</div>
}