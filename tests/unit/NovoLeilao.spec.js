import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http' // O componente NovoLeilao evoca createLeilao() ao ser montado, vamos Mockar

jest.mock('@/http') // O Jest irá interceptar dependencias importadas deste diretorio, para mockar o resultado:
createLeilao.mockResolvedValue()

const $router = { push: jest.fn() } // Criando uma variavel $router para subsituir a original que está no componente

describe('Um novo leilao deve ser criado', () => {
  test('Dado o formulario preenchido, um leilao deve ser criado', () => {
    const wrapper = mount(NovoLeilao, { mocks: { $router /* Aloca esta variavel dentro do escopo do componente */ } })
    wrapper.find('input.produto').setValue('Acer Aspire Nitro 5')
    wrapper.find('textarea.descricao').setValue('Notebook gamer equipado com GTX 1650 4GB e Intel Core i5 10300H')
    wrapper.find('input.valor').setValue(4899)
    wrapper.find('form').trigger('submit')
    expect(createLeilao).toHaveBeenCalled()
  })
})
