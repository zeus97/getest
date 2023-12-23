export interface Empleado{
    nombre:string,
    fechaDeNacimiento:number,
    edad:number,
    estatus:boolean,
    cargo:{
        id:number,
        description:string
    }
};

export interface EmpleadosResponse extends Empleado{
    id:string
}

export interface EmpleadosResponses {
    content: EmpleadosResponse[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    size: number;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }

