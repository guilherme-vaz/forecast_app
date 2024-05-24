import axios, { AxiosResponse } from 'axios';
import { render, fireEvent } from '@testing-library/react'
import { Weather } from '../components/Weather/Weather';

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Call HG Brasil Weather API", () => {

    it("Should call the HG Brasil Weather api", async () => {
        const data = [
            {
                city: "Maceió, AL",
                city_name: "Maceió",
                cref: "aa562f",
            },
        ];

        const mockedResponse: AxiosResponse = {
            data: data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };

        mockedAxios.get.mockResolvedValueOnce(mockedResponse);

        const { getByText, debug, getByPlaceholderText, findByText } = render(<Weather />);

        const inputElement = getByPlaceholderText('Digite o nome da cidade');
        const consultButton = getByText('Consultar');

        expect(axios.get).not.toHaveBeenCalled();
        fireEvent.change(inputElement, { target: { value: 'Maceió' } }); 
        fireEvent.click(consultButton);
        expect(axios.get).toHaveBeenCalled();
        expect(await findByText('Maceió')).toBeInTheDocument()
    })
})