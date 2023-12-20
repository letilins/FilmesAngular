import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup } from '@angular/forms';
import { FilmesService } from 'src/app/filmes.service';
import { Filmes } from 'src/app/Filmes';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.css']
})
export class FilmesComponent implements OnInit {
  formulario: any;
  tituloFormulario!: string;
  filmes: Filmes[] = [];
  Nome!: string;
  FilmeId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false; 
  
  modalRef!: BsModalRef;

  constructor(private filmesService: FilmesService,
    private modalService: BsModalService) {}

    ngOnInit(): void {
      this.filmesService.PegarTodos().subscribe((resultado) => {
        this.filmes = resultado;
      });
    }
  
    ExibirFormularioCadastro(): void {
      this.visibilidadeTabela = false;
      this.visibilidadeFormulario = true;
      this.tituloFormulario = 'Novo Filme';
      this.formulario = new FormGroup({
        nome: new FormControl(null),
        ano: new FormControl(null),
        diretor: new FormControl(null),
        atores: new FormControl(null),
        genero: new FormControl(null),
      });
    }
    ExibirFormularioAtualizacao(FilmesId: any): void {
      this.visibilidadeTabela = false;
      this.visibilidadeFormulario = true;
    
      this.filmesService.PegarPeloId(FilmesId).subscribe((resultado) => {
        this.tituloFormulario = `Atualizar ${resultado.Nome}`;
    
        this.formulario = new FormGroup({
          filmeId: new FormControl(resultado.FilmesId),
          nome: new FormControl(resultado.Nome),
          ano: new FormControl(resultado.Ano),
          diretor: new FormControl(resultado.Diretor),
          atores: new FormControl(resultado.Atores),
          genero: new FormControl(resultado.Genero),
        });
      });
    }
  
    EnviarFormulario(): void {
      const filme: Filmes = this.formulario.value;
  
      if (filme.FilmesId > 0) {
        this.filmesService.AtualizarFilmes(filme).subscribe((resultado) => {
          this.visibilidadeFormulario = false;
          this.visibilidadeTabela = true;
          alert('Filme atualizado com sucesso');
          this.filmesService.PegarTodos().subscribe((registros) => {
            this.filmes = registros;
          });
        });
      } else {
        this.filmesService.SalvarFilmes(filme).subscribe((resultado) => {
          this.visibilidadeFormulario = false;
          this.visibilidadeTabela = true;
          alert('Filme inserido com sucesso');
          this.filmesService.PegarTodos().subscribe((registros) => {
            this.filmes = registros;
          });
        });
      }
    }
  
    Voltar(): void {
      this.visibilidadeTabela = true;
      this.visibilidadeFormulario = false;
    }
  
    ExibirConfirmacaoExclusao(filmeId: number, nomeFilme: any, conteudoModal: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(conteudoModal);
      this.FilmeId = filmeId;
      this.Nome = nomeFilme;
    }
  
    ExcluirFilme(filmeId: number){
      this.filmesService.ExcluirFilmes(filmeId).subscribe(resultado => {
        this.modalRef.hide();
        alert('Filme excluído com sucesso');
        this.filmesService.PegarTodos().subscribe(registros => {
          this.filmes = registros;
        });
      });
    }
}
