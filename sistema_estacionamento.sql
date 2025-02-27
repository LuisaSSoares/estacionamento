create database sistema_estacionamento;
use sistema_estacionamento;

create table vagas (
identificador varchar(2) not null primary key,
ocupado boolean default false,
vaga_pref boolean default false,
tipo_pref varchar(255)
);

create table carros (
placa varchar(7) not null primary key,
motorista varchar(255),
senha varchar(255),
vaga_identificador varchar(2),
foreign key (vaga_identificador) references vagas(identificador)
);

