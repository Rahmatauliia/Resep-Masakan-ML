<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('reseps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_daerah');
            $table->unsignedBigInteger('id_kategori');
            $table->string('nama');
            $table->text('bahan');
            $table->text('langkah');
            $table->string('gambar');
            $table->string('slug');

            $table->foreign('id_daerah')->references('id')->on('daerahs')->onDelete('cascade');
            $table->foreign('id_kategori')->references('id')->on('kategoris')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reseps');
    }
};
