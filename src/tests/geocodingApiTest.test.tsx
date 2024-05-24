import axios, { AxiosResponse } from 'axios';
import { render, fireEvent } from '@testing-library/react'
import { Weather } from '../components/Weather/Weather';


jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Call Geocoding API", () => {

    it("Should call the geocoding api", async () => {
        const geocoding = [
            {
                name: "Maceió",
                lat: -9.6476843,
                lon: -35.7339264,
                country: "BR",
                state: "Alagoas"
            },
        ];

        const mockedResponse: AxiosResponse = {
            data: geocoding,
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